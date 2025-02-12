function Customer(name, email) {
   // Propiedades:
   // - id
   // - name
   // - email
   // - totalPurchases (inicia en 0)
   // - createdAt
   this.id = Date.now();
   this.name = name;
   this.email = email.toLowerCase();
   this.totalPurchases = 0;
   this.createdAt = new Date()
}

// Métodos del prototipo:
Customer.prototype.updateEmail = function (email) {
   // Debemos valiar que el email que nos envian tenga @
   // REGEX => Regular Expression
   if (!email || !email.includes("@")) {
      throw new Error("Email invalido")
   }
   this.email = email.toLowerCase()
};

Customer.prototype.renderUI = function () {
   const li = document.createElement("li")
   li.className = "list-group-item";
   li.innerHTML = `
  <div class="accordion">
     <div class="d-flex justify-content-between align-items-center">
       <div>
         <h6>${this.name}</h6>
         <small>${this.email}</small>
       </div>
       <div>
         <form onsubmit="actualizarCorreo(event, ${this.id})">
             <input type="email" class="form-control form-control-sm"
                value="${this.email}">
           <button type="submit" class="btn btn-primary btn-sm">Actualizar</button>
         </form>
       </div>
     </div>
   </div>
   `;
   return li;
};
