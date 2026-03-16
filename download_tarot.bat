@echo off
cd /d D:\tarot-app\tarot-images

echo Starting download of 77 remaining tarot cards...
set count=0

for %%i in (
    m02 m03 m04 m05 m06 m07 m08 m09 m10 m11 m12 m13 m14 m15 m16 m17 m18 m19 m20 m21
    w02 w03 w04 w05 w06 w07 w08 w09 w10 w11 w12 w13 w14
    c01 c02 c03 c04 c05 c06 c07 c08 c09 c10 c11 c12 c13 c14
    s01 s02 s03 s04 s05 s06 s07 s08 s09 s10 s11 s12 s13 s14
    p01 p02 p03 p04 p05 p06 p07 p08 p09 p10 p11 p12 p13 p14
) do (
    echo Downloading %%i.jpg...
    curl -s -o "D:\tarot-app\tarot-images\%%i.jpg" "https://data.totl.net/tarot-rwcs-images/%%i.jpg"
    if exist "D:\tarot-app\tarot-images\%%i.jpg" (
        set /a count+=1
        echo   Success
    ) else (
        echo   FAILED
    )
)

echo.
echo Download complete!
dir /b D:\tarot-app\tarot-images\*.jpg | find /c /v ""
