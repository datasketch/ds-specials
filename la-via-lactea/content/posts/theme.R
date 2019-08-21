library(tidyverse)
library(hgchmagic)
library(googlesheets)
library(htmlwidgets)

theme <- list(
  background = "transparent",
  colors = c("#FCC047",
             "#C3E557",
             "#009478",
             "#33C1C4",
             "#157BB0",
             "#6A67CE",
             "#914486",
             "#E1593E"),
  fontFamily = "\"Barlow\"",
  fontSize = "13px",
  plotBorderWidth = 0,
  bordercolor = "transparent",
  stylesTitleX = list(color = "#666666", fontSize = "17px"),
  stylesTitleY = list(color = "#666666", fontSize = "17px"),
  stylesY = list(gridLineWidth = 0),
  stylesX = list(gridLineWidth = 0),
  stylesLabelX = list(color = "#666666",
                      fontSize = "11px", enabled = TRUE),
  stylesLabelY = list(enabled = F),
  labsData = list(colLabel = "contrast", familyLabel =  "\"Barlow\"", sizeLabel = NULL, textDecoration = "none")
)
opts <- list(theme = tma(theme))
library(visNetwork)