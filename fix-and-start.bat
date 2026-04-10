@echo off
echo.
echo ========================================
echo  Chop Shop - Fix ^& Start (Node 22 fix)
echo ========================================
echo.

echo [1/3] Removing old node_modules...
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul

echo [2/3] Reinstalling with legacy peer deps...
npm install --legacy-peer-deps

if %errorlevel% neq 0 (
    echo.
    echo ERROR: npm install failed. Try running as Administrator.
    pause
    exit /b 1
)

echo [3/3] Starting React app...
echo.
npm start
