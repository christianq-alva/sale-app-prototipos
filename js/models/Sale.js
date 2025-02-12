function Sale(customer, date = new Date()) {
   if (!(customer instanceof Customer)) {
      throw new Error('Cliente inválido');
   }
   // Propiedades:
   // - id (Date.now())
   // - customer
   // - products (array vacío para iniciar)
   // - total (inicia en 0)
   // - date
   // - status ('pending' | 'completed' | 'cancelled')
   this.id = Date.now();
   this.customer = customer;
   // El products, va a ser todos los productos que mi cliente, quiera comprar
   this.products = [];
   this.total = 0;
   this.date = date;
   this.status = "pending";
}

Sale.prototype.getTotal = function() {
   return `S/ ${this.products.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)}`;
};

Sale.prototype.addProduct = function (product, quantity) {
   if (!product.hasStock(quantity)) {
      throw new Error('Stock insuficiente');
   }
   this.products.push({ product, quantity });
};

Sale.prototype.removeProduct = function (productId) {
   this.products = this.products.filter(item => item.product.id !== productId);
};

Sale.prototype.confirm = function () {
   // Update stock for all products
   for (const item of this.products) {
      item.product.updateStock(-item.quantity);
   }
   this.status = "completed";
};
