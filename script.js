let names;
const pokemons=document.querySelector("#pokemons");
const search=document.querySelector("#search-input");

for(let i=1;i<152;i++){
    fetch("https://pokeapi.co/api/v2/pokemon/"+i).then(response=>response.json()).then(data=>{
        displayPokemon(data);
    }).then(d=>{
        names=document.querySelectorAll("#body .names");
    });
}

const displayPokemon=(data)=>{

    let typeList="";

    typeList=typesText(data);

    let color=colorSelected(typeList);

    let id=idFormat(data.id);
    
    let html=`<div class="card" id="cards" style="background-color:${color}">
                    <div class="card-title card-img-top" id="img">
                        <img src=${data.sprites['other']['official-artwork'].front_default}>
                    </div>
                    <div class="card-body" id="body">
                        <h3 class="names">${capitalize(data.name)}</h3>
                        <h5>#${id}</h5>
                        <h5>${data.weight} kg</h5>
                        <h5>Types: ${typeList}</h5>
                    </div>
                </div>`;

    pokemons.innerHTML+=html;
    
}

const capitalize=(text)=>{
    return text.charAt(0).toUpperCase()+text.slice(1);
}

const typesText=(data)=>{
    let types="";
    for(let i=0;i<data.types.length;i++){
        types=types.concat(capitalize(data.types[i].type.name),", ");
    }

    return types.substring(0,types.length-2);
}

const idFormat=(id)=>{
    if(id.toString().length==1){
        return "00"+id;
    }else if(id.toString().length==2){
        return "0"+id;
    }else {
        return id;
    }
}


const colorSelected=(list)=>{
    if(list.toLowerCase().startsWith("grass")){
        return "#c5e7b1";
    }else if(list.toLowerCase().startsWith("fire")){
        return "#f5b889";
    }else if(list.toLowerCase().startsWith("water")){
        return "#a2bdf6";
    }else if(list.toLowerCase().startsWith("electric")){
        return "#fbe89d";
    }else if(list.toLowerCase().startsWith("ice")){
        return "#b4e4e2";
    }else if(list.toLowerCase().startsWith("fighting")){
        return "#eeadaa";
    }else if(list.toLowerCase().startsWith("poison")){
        return "#e3b5e2";
    }else if(list.toLowerCase().startsWith("ground")){
        return "#efdba9";
    }else if(list.toLowerCase().startsWith("flying")){
        return "#b9a3f5";
    }else if(list.toLowerCase().startsWith("psychic")){
        return "#fb9db9";
    }else if(list.toLowerCase().startsWith("bug")){
        return "#e9f2a6";
    }else if(list.toLowerCase().startsWith("rock")){
        return "#e8deb0";
    }else if(list.toLowerCase().startsWith("ghost")){
        return "#cabeda";
    }else if(list.toLowerCase().startsWith("dragon")){
        return "#b79bfd";
    }else if(list.toLowerCase().startsWith("dark")){
        return "#d8cac0";
    }else if(list.toLowerCase().startsWith("steel")){
        return "#c2c2d6";
    }else if(list.toLowerCase().startsWith("fairy")){
        return "#e6b3cc";
    }else {
        return "#d7d6c1";
    }
    
}


search.addEventListener("keyup",(e)=>{
    e.preventDefault();
    const val=e.target.value;
    Array.from(names).filter(f=>{

        if(!f.textContent.toLowerCase().includes(val)){
            f.parentElement.parentElement.classList.add("filtered");
        }else{
            f.parentElement.parentElement.classList.remove("filtered");
        }
    });
})