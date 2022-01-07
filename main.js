
    let myleads = [] ;
    const textarea = document.querySelector("#input-el");
    const savebtn = document.querySelector("#save-btn");
    const deletebtn = document.querySelector("#delete-btn");
    const savetab = document.getElementById("tab-btn");
    var list =  document.querySelector("#ul-el");
    
    const lsl = JSON.parse( localStorage.getItem("myleads"));
    
    if(lsl){
        myleads = lsl;
        render(myleads);
    }

    function render(leads) {
        let listItems = ""
        for (let i = 0; i < leads.length; i++) {
            listItems += `
                <li>
                    <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                    </a>
                </li>
            `
        }
        list.innerHTML = listItems
    }

    savebtn.addEventListener("click", function() {
        myleads.push(textarea.value);
        textarea.value = "";
        
        render(myleads) ;
        localStorage.setItem("myleads", JSON.stringify(myleads));
       
        console.log(localStorage.getItem("myleads"));

    });

    deletebtn.addEventListener("click",function(){
        myleads = [] ;
        localStorage.clear();
        render(myleads);
    });


    savetab.addEventListener("click",function(){
        chrome.tabs.query({active: true, currentWindow: true},function(tabs){
            myleads.push(tabs[0].url);
            localStorage.setItem("myleads", JSON.stringify(myleads));
            render(myleads);
        })
    });