@echo off
SET branch=%~1
if NOT DEFINED branch (SET branch=dev)
echo.
echo WARNING!
echo.
echo This will merge '%branch%' with the master branch.
echo.
echo Press CTRL+C to cancel.
echo.
pause
cd ..
git checkout master
echo.
echo Merging '%branch%' with master branch.
echo.
git merge %branch% --no-ff
pause