@echo off
cd ..
SET msg=%~1
if NOT DEFINED msg (SET msg=Generic commit)
echo.
echo Adding files to stage.
git add *
echo.
echo Current git status:
echo.
git status
echo.
echo Press CTRL+C to cancel the commit.
echo.
pause
echo.
git commit -m "%msg%"
echo.
echo Commit attempt complete.
echo.
git push
echo.
echo Push attempt complete.
echo.
pause