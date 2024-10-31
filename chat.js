let prompt=document.querySelector("#prompt");
let chatcontainer=document.querySelector(".chat-container");
let imagebtn=document.querySelector("#image");
let imageinput=document.querySelector("#image input");


const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB1rd9UN99jJXRf4pTKYa-mg3bzOpRuj70"
let user={
    message:null,
    file:{
             mime_type:null,
                data: null
    }
}
async function generateResponse(aichatbox) {
    let text=aichatbox.querySelector(".ai-chatarea")
    RequestOptions={
        method:"POST",
        headers:{
        'Content-Type':'application/json'
        },
        body:JSON.stringify({"contents":[
            {"parts":[{"text":user.message},(user.file.data?[{"inline_data":user.file}]:[])
        ]}]})
    }
try{
    let response= await fetch(Api_Url,RequestOptions)
    let data=await response.json()
    let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>").trim()
    text.innerHTML=apiResponse
}

   catch(error){
    console.log(error);
   }
   finally{
    chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})

   }

    
}





function createchatbox(html,classes){
    let div=document.createElement("div");
    div.innerHTML=html;
    div.classList.add(classes);
    return div;
}



function handlechatResponse(userMessage){
    user.message=userMessage;
let html=`<img src="th-Photoroom.png" alt="" id="user-image" width="50">
<div class="user-chatarea">
${user.message}
${user.file.data?`<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" /> ` : ""}
</div>`
prompt.value=""
let userchatbox=createchatbox(html,"user-chatbox")
chatcontainer.appendChild(userchatbox)

chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"})

setTimeout(()=>{
  let html=  `   <img src="OIP (3)-Photoroom.png" alt="" id="ai-image" width="70">
    <div class="ai-chatarea">
   <img src="774.gif"alt="" class="load" width="150px">
    </div>`
    let aichatbox=createchatbox(html,"ai-chatbox")
    chatcontainer.appendChild(aichatbox)
    generateResponse(aichatbox)
},600)
}








prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
    handlechatResponse(prompt.value)   

}
 
    

    
})
imageinput.addEventListener("change",()=>{
    const file=imageinput.files[0];
    if(!file){
        return;
    let reader=new FileReader();
    reader.onload=(e)=>{
      let base64string=e.target.result.split(",")[1]
     user.file={
        mime_type:file.type,
           data: base64string
}
    }
    reader.readAsDataURL(file)
    }
})

imagebtn.addEventListener("click",()=>{
    imagebtn.querySelector("input").click()
})