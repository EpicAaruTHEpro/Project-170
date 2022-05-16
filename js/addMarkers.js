AFRAME.registerComponent("create-markers", {
  
    init: async function() {
      let mainScene = document.querySelector("#main-scene")
      let toys = await this.getToys()
      toys.map(toy => {
        console.log(toy)
        let marker = document.createElement("a-marker")
        marker.setAttribute("id", toy.id)
        marker.setAttribute("type", "pattern")
        marker.setAttribute("url", toy.marker_pattern_url)
        marker.setAttribute("cursor", {rayOrigin: "mouse"})
        marker.setAttribute("marker-handler", {})
        mainScene.appendChild(marker)
        
        let model = document.createElement("a-entity")
        model.setAttribute("id", `model-${toy.id}`)
        model.setAttribute("position", toy.model_geometry.position)
        model.setAttribute("rotation", toy.model_geometry.rotation)
        model.setAttribute("scale", toy.model_geometry.scale)
        model.setAttribute("gltf-model", `url(${toy.model_url})`)
        model.setAttribute("gesture-handler", {})
        marker.appendChild(model)
  
        let mainPlane = document.createElement("a-plane")
        mainPlane.setAttribute("id", `main-plane-${toy.id}`)
        mainPlane.setAttribute("position", {x: 0, y:0, z:0})
        mainPlane.setAttribute("rotation", {x: -90, y:0, z:0})
        mainPlane.setAttribute("width", 2.3)
        mainPlane.setAttribute("height", 1.5)
        marker.appendChild(mainPlane)
  
        let titlePlane = document.createElement("a-plane")
        titlePlane.setAttribute("id", `title-plane-${toy.id}`)
        titlePlane.setAttribute("position", {x: 0, y:0.89, z:0.02})
        titlePlane.setAttribute("rotation", {x: 0, y:0, z:0})
        titlePlane.setAttribute("width", 2.29)
        titlePlane.setAttribute("height", 0.3)
        titlePlane.setAttribute("material", {color: "#f0c305"})
        mainPlane.appendChild(titlePlane)
  
        let toyTitle = document.createElement("a-entity")
        toyTitle.setAttribute("id", `toy-title-${toy.id}`)
        toyTitle.setAttribute("position", {x:0, y: 0, z:0.1 })
        toyTitle.setAttribute("rotation", {x:0, y: 0, z:0 })
        toyTitle.setAttribute("text", {
          font: "monoid", value: toy.toy_name.toUpperCase(), color: "black", width: 2, height: 5, align: "center"
        })
        titlePlane.appendChild(toyTitle)
  
        let description = document.createElement("a-entity")
        description.setAttribute("id", `description-${toy.id}`)
        description.setAttribute("position", {x:0, y: 0, z:0.1 })
        description.setAttribute("rotation", {x:0, y: 0, z:0 })
        description.setAttribute("text", {
          font: "monoid", value: `${toy.description} Age Group: ${toy.age_group}`, color: "black", width: 2, height:5, align: "left"
        })
        mainPlane.appendChild(description)
        
      })
    },
  
    getToys: async function() {
      return await firebase
      .firestore()
      .collection("toys")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data())
      })
    },
    
    });
  