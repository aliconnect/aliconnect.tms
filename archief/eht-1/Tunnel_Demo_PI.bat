@echo off
SET BROWSER="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
SET run=1

call Tunnel
call Verkeersbuis_1
call Tunnel_GUI
exit

START "" %BROWSER% --app="https://rws.aliconnect.nl/tms/eht/webroot/om/Verkeerslichten(3443787)/children/id/aHR0cHM6Ly9yd3MuYWxpY29ubmVjdC5ubC9hcGkvVmVya2VlcnNsaWNodGVuKDM0NDM3ODcp/?$select=Title,Subject,Summary,Master,Source,HasChildren,HasAttachements,State,Categories,CreatedDateTime,LastModifiedDateTime,LastVisitDateTime,StartDateTime,EndDateTime,FinishDateTime&$filter=FinishDateTime IS NULL"^
 --use-fake-ui-for-media-stream^
 --window-position=0,0^
 --window-size=1680,1200^
 --disable-web-security^
 --allow-file-access-from-files^
 --disable-application-cache

START "" %BROWSER% --app="http://192.168.0.135:8080/"
START "" %BROWSER% --app="http://wall.localhost:9002/twin/"
START "" %BROWSER% --app="https://rws.aliconnect.nl/tms/eht/lts/lib/Tunnel/GUI/webroot/?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJzaGEyNTYifQ.eyJpc3MiOiJyd3MuYWxpY29ubmVjdC5ubCIsInNjb3BlIjoid2Vic2l0ZS5yZWFkIG5hbWUgZW1haWwiLCJzdWIiOiIyODA0MzQyIiwiYXVkIjoiMzY2NjEzNCIsImV4cCI6MTYwNTM2Mjk3MCwiaWF0IjoxNjA1Mjc2NTcwfQ.UKHp3WPoh5DtXvZBG9D3TNpLeh6v17rD1kfJSRBWqxU"

START "" %BROWSER% --app="https://rws.aliconnect.nl/tms/eht/lts/lib/Tunnel/GUI/webroot/twin/?wall=1&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJzaGEyNTYifQ.eyJpc3MiOiJyd3MuYWxpY29ubmVjdC5ubCIsInNjb3BlIjoid2Vic2l0ZS5yZWFkIG5hbWUgZW1haWwiLCJzdWIiOiIyODA0MzQyIiwiYXVkIjoiMzY2NjEzNCIsImV4cCI6MTYwNTM2Mjk3MCwiaWF0IjoxNjA1Mjc2NTcwfQ.UKHp3WPoh5DtXvZBG9D3TNpLeh6v17rD1kfJSRBWqxU"

START "" %BROWSER% --app="https://wall.aliconnect.nl/v1/api/lib/vms/index.html?wall=1"
START "" %BROWSER% --app="https://wall.aliconnect.nl/v1/api/lib/vms/index.html?wall=1&cam=201" --window-size=600,400

START "" %BROWSER% --app="https://cam.aliconnect.nl/v1/api/vms/index.html?wall=1&facingMode=user&cam=108" --window-size=600,400
