AFRAME.registerComponent("marker-handler", {
    init: async function() {

      var toys = await this.getToys()

      this.el.addEventListener("markerFound", () => {
        console.log("Marker is found")
        var markerId = this.el.id;      
        this.handleMarkerFound(toys, markerId);
      })
      this.el.addEventListener("markerLost", () => {
        console.log("Marker is lost")
        this.handleMarkerLost()
    })
    },
    handleMarkerFound: function() {
        let buttonDiv = document.getElementById("button-div")
        buttonDiv.style.display = "flex"
        let orderSummaryButton = document.getElementById("order-summary-button")
        let orderButton = document.getElementById("order-button")
        orderSummaryButton.addEventListener("click", function () {
            swal({
                icon: "warning",
                title: "Order Summary",
                text: "Work in Progress"
            })
        })
        orderButton.addEventListener("click", function () {
            swal({
                icon: "success",
                title: "Thank you for Ordering!",
                text: "Your Order is on the Way!"
            })
        })

        // Changing Model scale to initial scale
        var toy = toys.filter(toy => toy.id === markerId)[0];

        var model = document.querySelector(`#model-${toy.id}`);
        model.setAttribute("position", toy.model_geometry.position);
        model.setAttribute("rotation", toy.model_geometry.rotation);
        model.setAttribute("scale", toy.model_geometry.scale);
    },
    handleMarkerLost: function() {
        let buttonDiv = document.getElementById("button-div")
        buttonDiv.style.display = "none"
    },
    getToys: async function () {
        return await firebase
          .firestore()
          .collection("toys")
          .get()
          .then(snap => {
            return snap.docs.map(doc => doc.data());
          });
      }    

  });
  