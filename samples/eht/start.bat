@echo off
SET BROWSER="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
SET LIB=..\..\lib

IF EXIST %LIB%\%1\webroot1 (
  START "" %BROWSER% --app="http://localhost:%2"^
   --use-fake-ui-for-media-stream^
   --window-position=0,0^
   --window-size=1680,1200^
   --disable-web-security^
   --allow-file-access-from-files^
   --disable-application-cache
)

if "%run%"=="1" (
  goto start
) else (
  goto node
)

:node
cls
node %LIB%\%1 --config-http-port=%2 %3 %4 %5 %6 %7 %8 %9
pause
goto node

:start
START "" node %LIB%\%1 --config-http-port=%2 %3 %4 %5 %6 %7 %8 %9
