@echo off
cd /d "%~dp0"
echo Projettare - visualizacao local
echo Mantenha esta janela aberta enquanto visita o site.
echo Para encerrar, feche esta janela ou pressione Ctrl+C.
start "" /b powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:4173'"
node serve.mjs
pause
