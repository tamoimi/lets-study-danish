import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try{
const{text, targetLang} = await request.json()

    const target = targetLang.toLowerCase();
    const source = target === "en" ? "da" : "en"; 


// LibreTranslate shared server URL
const response = await fetch('https://libretranslate.de/translate', {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
        q: text,
     source,
target,
format:"text"
    }),

});

const data = await response.json();

return NextResponse.json({translatedText: data.translatedText});

    }catch(error){
console.error("Translation error:", error);
return NextResponse.json({error: "Translation failed"}, {status: 500});
    }
}