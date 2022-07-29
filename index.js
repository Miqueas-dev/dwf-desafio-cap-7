function addWorkCard(params) {
   const template = document.querySelector("#portfolio-card-template")
   const container = document.querySelector(".contenedores")
   
   template.content.querySelector(".title-dwf").textContent = params.title;
   template.content.querySelector(".descripcion").textContent = params.description;
   template.content.querySelector(".imagen").src = params.image;
   template.content.querySelector(".link-github").href = params.url;
   
   
   const clone = document.importNode(template.content, true);
   container.appendChild(clone)
   
}

function getWorks() {
   return fetch("https://cdn.contentful.com/spaces/w2omesemomr4/environments/master/entries?access_token=nByXFxyKJmG0LXK0-NinfueyFsZmPP916pbupLkzf4s&content_type=work"
   ).then(res => {
      return res.json()
   }).then((data) => {
      const fieldsCollection = data.items.map((item) => {
         console.log(data)
      
         const obj =  {
            title: item.fields.titulo,
            description: item.fields.description,
            url: item.fields.url,
            imageId: item.fields.imagen.sys.id,
            includes: data.includes.Asset,
         }
         return obj
      });
      fieldsCollection.forEach((x) => {
         const idFind = buscarAsset(x.imageId, x.includes);
         x.image = "https:" + idFind.fields.file.url;
      });
      return fieldsCollection;
   });

}

function buscarAsset(assetId, includes) {
   const encontrado = includes.find((inc) => {
      return inc.sys.id == assetId;
   });
   return encontrado
}

function main() {
   getWorks().then(function (work) {
      for (const w of work) {
         addWorkCard(w)
      }
   })
}

main()