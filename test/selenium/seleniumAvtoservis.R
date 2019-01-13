#'
#' Poženi Docker vsebnik
#' 
#' @param dockerContainer ime docker vsebnika
#' @param waitTime čas čakanja (v sekundah) na zagon vsebnika
#'
dockerStart <- function(dockerContainer = "selenium-chrome-debug", waitTime = 10) {
  status <- tryCatch({
    system(paste0("docker ps | grep ", dockerContainer), intern = TRUE)
  }, warning = function(war) {
    return(NA)
  }, error = function(err) {
    cat(paste0("Prišlo je do napake : ", err, "\n"))
    return(NA)
  }, finally = {})
  
  if (is.na(status)) {
    cat(paste0(format(now(), "%Y-%m-%d %H-%M"), " :: ",
               "POŽENI Selenium Chrome strežnik v Docker vsebniku '", dockerContainer, "'.\n"));
    system(paste0("docker start ", dockerContainer), ignore.stdout = TRUE)
    Sys.sleep(waitTime)
  } else {
    cat(paste0(format(now(), "%Y-%m-%d %H-%M"), " :: ",
               "Selenium Chrome strežnik v Docker vsebniku '", dockerContainer, "' je že pognan.\n"));
  }
}

#'
#' Ustavi Docker vsebnik
#' 
#' @param dockerContainer ime docker vsebnika
#' @param waitTime čas čakanja (v sekundah) za zaustavitev vsebnika
#'
dockerStop <- function(dockerContainer = "selenium-chrome-debug", waitTime = 3) {
  status <- tryCatch({
    system(paste0("docker ps | grep ", dockerContainer), intern = TRUE)
  }, warning = function(war) {
    return(NA)
  }, error = function(err) {
    cat(paste0("Prišlo je do napake : ", err, "\n"))
    return(NA)
  }, finally = {})
  
  if (!is.na(status)) {
    cat(paste0(format(now(), "%Y-%m-%d %H-%M"), " :: ",
               "USTAVI Selenium Chrome strežnik v Docker vsebniku '", dockerContainer, "'.\n"));
    system(paste0("docker stop ", dockerContainer), ignore.stdout = TRUE)
    Sys.sleep(waitTime)
  } else {
    cat(paste0(format(now(), "%Y-%m-%d %H-%M"), " :: ",
               "Selenium Chrome strežnik v Docker vsebniku '", dockerContainer, "' je že ustavljen.\n"));
  }
}

#'
#' Inicializacija vmesnika do Selenium strežnika in
#' dostop do začetne spletne strani aplikacije.
#' 
pripraviOkolje <- function() {
  knjiznice <- c("RSelenium", "stringr")
  invisible(sapply(knjiznice, function(knjiznica) {
    if (knjiznica %in% rownames(installed.packages()) == FALSE) { 
      install.packages(knjiznica) 
    }
  }))
  suppressPackageStartupMessages(suppressWarnings({
    invisible(lapply(knjiznice, require, character.only = TRUE))
  }))
  
  cat("Selenium inicializacija ... ")
  rd <- remoteDriver(port = 4445L, browserName = "chrome")
  rd$open(silent = TRUE)
  
  cat("dostopam do začetne spletne strani aplikacije ... ")
  rd$navigate(urlNaslov)  # Odpri začetno stran
  
  if (rd$getTitle() == "Avtoservis") {
    cat("[OK]")
    rd
  } else {
    cat("[napaka]")
    NULL
  }
}

test1 <- function() {
  
  rd$navigate(urlNaslov)
  cat("[OK] Odpri začetno stran.\n")
  Sys.sleep(2)
  
  rd$findElement("xpath", "//a[contains(text(), 'Login')]")$clickElement()
  tekst <- unlist(rd$findElement("xpath", "//p")$getElementText())
  cat(ifelse(tekst == "Looking for ", "[OK] Pravilen naslov prijavne strani.\n", "[NAPAKA] Napačen naslov prijavne strani.\n"));
  rd$findElement("xpath", "//a[contains(text(), 'register')]")$clickElement()
  
  tekst <- unlist(rd$findElement("xpath", "//label")$getElementText())
  cat(ifelse(tekst == "Name:", "[OK] Pravilen naslov registracijske strani.\n", "[NAPAKA] Napačen naslov registracijske strani.\n"));
  
  rd$findElement("xpath", "//input[@id='name']")$sendKeysToElement(list("Edward Teach"))
  rd$findElement("xpath", "//input[@id='mail']")$sendKeysToElement(list("black@beard.net"))
  rd$findElement("xpath", "//input[@id='pass']")$sendKeysToElement(list("test"))
  cat("[OK] Prijavni podatki vnešeni.\n");
  
  rd$findElement("xpath", "//button[@type='submit']")$clickElement()
  
  Sys.sleep(3)
  
  tekst <- unlist(rd$findElement("xpath", "//h1")$getElementText())
  cat(ifelse(tekst == "Najboljši servis v mestu !", "[OK] Pravilen naslov prve strani.\n", "[NAPAKA] Napačen naslov prve strani.\n"));
  
  rd$findElement("xpath", "//a[contains(text(), 'Login')]")$clickElement()
  tekst <- unlist(rd$findElement("xpath", "//p")$getElementText())
  cat(ifelse(tekst == "Looking for ", "[OK] Pravilen naslov prijavne strani.\n", "[NAPAKA] Napačen naslov prijavne strani.\n"));
  
  rd$findElement("xpath", "//input[@id='mail']")$sendKeysToElement(list("black@beard.net"))
  rd$findElement("xpath", "//input[@id='pass']")$sendKeysToElement(list("test"))
  cat("[OK] Prijavni podatki vnešeni.\n");
  
  rd$findElement("xpath", "//button[@type='submit']")$clickElement()
  
  tekst <- unlist(rd$findElement("xpath", "//h3")$getElementText())
  cat(ifelse(tekst == "Inventory", "[OK] Pravilen naslov strani po prijavi.\n", "[NAPAKA] Napačen naslov strani po prijavi.\n"));
  
  Sys.sleep(3)
  
  nazivGumba <- unlist(rd$findElement("xpath", "//a[@ng-click='vm.inventoryFormModal()']")$getElementText())
  cat(ifelse(nazivGumba == "Add", "[OK] Dodajanje je omogočeno.\n", "[NAPAKA] Dodajanje je onemogočeno.\n"));
  rd$findElement("xpath", "//a[@ng-click='vm.inventoryFormModal()']")$clickElement()
  
  Sys.sleep(3)
  
  tekst <- unlist(rd$findElement("xpath", "//label")$getElementText())
  cat(ifelse(tekst == "Item", "[OK] Modalno okno je prikazano.\n", "[NAPAKA] Modalno okno ni prikazano.\n"));
  
  rd$findElement("xpath", "//input[@id='item']")$sendKeysToElement(list("gume"))
  rd$findElement("xpath", "//input[@id='description']")$sendKeysToElement(list("zimske gume"))
  rd$findElement("xpath", "//input[@id='quantity']")$sendKeysToElement(list("1"))
  cat("[OK] Podatki vnešeni.\n");
  
  rd$findElement("xpath", "//button[@type='submit']")$clickElement()
  
  Sys.sleep(3)
  
  item <- rd$findElement("xpath", "(//div[contains(@class, 'col-md-2 col-12 ng-binding')])")
  content <- unlist(item$findChildElement$getElementText())
  cat(ifelse(vsebinaKomentarja == "gume", "[OK] Vsebina tabele je ustrezna.\n", "[NAPAKA] Vsebina tabele ni ustrezna.\n"));
  
  Sys.sleep(3)
  
  rd$findElement("xpath", "//input[@id='filter']")$sendKeysToElement(list(key = "control", "a"))
  Sys.sleep(1)
  rd$findElement("xpath", "//input[@id='filter']")$sendKeysToElement(list(key = "delete"))
  rd$findElement("xpath", "//input[@id='filter']")$sendKeysToElement(list("gume"))
  item <- rd$findElement("xpath", "(//div[contains(@class, 'col-md-2 col-12 ng-binding')])")
  content <- unlist(item$findChildElement$getElementText())
  cat(ifelse(vsebinaKomentarja == "gume", "[OK] Filtriranje ustrezno.\n", "[NAPAKA] Filtriranje ustrezno.\n"));
  
  Sys.sleep(3)
  
}

urlNaslov <- "avtoservis.herokuapp.com"
dockerStart()
rd <- pripraviOkolje()

test1()

dockerStop()


