document.addEventListener('DOMContentLoaded', () => {
  const shopSection = document.getElementById('shop-section');
  const collectionsSection = document.getElementById('collections-section');
  const shopItemsContainer = document.getElementById('shop-items');
  const collectionsList = document.getElementById('collections-list');
  const cartItemsList = document.getElementById('cart-items');
  const cartModal = document.getElementById('cart-modal');
  const adminModal = document.getElementById('admin-modal');
  const closeAdminModal = document.getElementById('close-admin-modal');
  const closeCartModal = document.getElementById('close-cart-modal');
  const profileBtn = document.getElementById('profile-btn');
  const cartBtn = document.getElementById('cart-btn');
  const shopBtn = document.getElementById('shop-btn');
  const collectionsBtn = document.getElementById('collections-btn');

  // Obtener el carrito desde localStorage o inicializarlo vacío
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Cerrar modales
  closeAdminModal.addEventListener('click', () => {
      adminModal.style.display = 'none';
  });

  closeCartModal.addEventListener('click', () => {
      cartModal.style.display = 'none';
  });

  // Abrir modal de perfil
  profileBtn.addEventListener('click', () => {
      adminModal.style.display = 'block';
  });

  // Abrir modal de carrito
  cartBtn.addEventListener('click', () => {
      cartModal.style.display = 'block';
      updateCartUI();
  });

  // Mostrar la sección Shop
  shopBtn.addEventListener('click', () => {
      shopSection.classList.remove('hidden');
      collectionsSection.classList.add('hidden');
  });

  // Mostrar la sección Collections
  collectionsBtn.addEventListener('click', () => {
      collectionsSection.classList.remove('hidden');
      shopSection.classList.add('hidden');
  });

  // Función para cargar los productos desde el JSON
  const loadProducts = async () => {
      try {
          const response = await fetch('../data/db.json'); // Asegúrate de que la ruta sea correcta
          const data = await response.json();
          const products = data.collection;
          const isAdmin = checkIfAdmin(); // Función para determinar si el usuario es Admin

          // Renderizar los productos en la sección Shop
          renderProducts(products);

          // Renderizar las colecciones
          renderCollections(products);

          if (isAdmin) {
              // Mostrar controles de CRUD si el usuario es administrador
              showAdminControls();
          }
      } catch (error) {
          console.error('Error al cargar los productos:', error);
      }
  };

  // Función para renderizar los productos en la página Shop
  const renderProducts = (products) => {
      shopItemsContainer.innerHTML = ''; // Limpiar contenedor

      products.forEach(product => {
          const productElement = document.createElement('div');
          productElement.classList.add('product-card');
          
          productElement.innerHTML = `
              <img class="imgShopP" src="${product.imagen_1}" alt="${product.nombre}" class="product-image">
              <h3 class="product-name">${product.nombre}</h3>
              <p class="product-price">$${product.precio.toFixed(2)}</p>
              <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
          `;
          
          shopItemsContainer.appendChild(productElement);
      });

      // Agregar event listeners a los botones de agregar al carrito
      const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
      addToCartBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
              addToCart(e.target.dataset.id);
          });
      });
  };

  // Función para renderizar las colecciones
  const renderCollections = (products) => {
      const collections = organizeProductsIntoCollections(products);
      collectionsList.innerHTML = ''; // Limpiar contenedor

      collections.forEach((collection, index) => {
          const collectionElement = document.createElement('div');
          collectionElement.classList.add('collection-card');
          
          collectionElement.innerHTML = `
              <h3>Collection ${index + 1}</h3>
              <div class="products-grid">
                  ${collection.map(product => `
                      <div class="product-card">
                          <img src="${product.imagen_1}" alt="${product.nombre}" class="collection-image">
                          <h3 class="collection-name">${product.nombre}</h3>
                          <p class="collection-price">$${product.precio.toFixed(2)}</p>
                          <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                      </div>
                  `).join('')}
              </div>
          `;
          
          collectionsList.appendChild(collectionElement);
      });

      // Agregar event listeners a los botones de agregar al carrito
      const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
      addToCartBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
              addToCart(e.target.dataset.id);
          });
      });
  };

  // Función para organizar productos en colecciones
  const organizeProductsIntoCollections = (products) => {
      const collections = [];
      const itemsPerCollection = 4;
      for (let i = 0; i < products.length; i += itemsPerCollection) {
          collections.push(products.slice(i, i + itemsPerCollection));
      }
      return collections;
  };

  // Función para agregar un producto al carrito
  const addToCart = (productId) => {
      fetch('/data/db.json')
          .then(response => response.json())
          .then(data => {
              const product = data.collection.find(p => p.id === productId);
              if (product) {
                  cart.push(product);
                  localStorage.setItem('cart', JSON.stringify(cart));
                  updateCartUI();
              }
          })
          .catch(error => console.error('Error al agregar al carrito:', error));
  };

  // Función para actualizar la UI del carrito
  const updateCartUI = () => {
      cartItemsList.innerHTML = ''; // Limpiar contenedor

      cart.forEach(item => {
          const cartItem = document.createElement('li');
          cartItem.innerHTML = `
              ${item.nombre} - $${item.precio.toFixed(2)}
              <button class="remove-from-cart-btn" data-id="${item.id}">Eliminar</button>
          `;

          cartItemsList.appendChild(cartItem);
      });

      // Agregar event listeners a los botones de eliminar del carrito
      const removeFromCartBtns = document.querySelectorAll('.remove-from-cart-btn');
      removeFromCartBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
              removeFromCart(e.target.dataset.id);
          });
      });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
      cart = cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartUI();
  };

  // Función para verificar si el usuario es Admin
  const checkIfAdmin = () => {
      // Lógica para determinar si el usuario es Administrador (ej. autenticación)
      return false; // Cambiar a `true` si el usuario es Administrador
  };

  // Función para mostrar controles de CRUD
  const showAdminControls = () => {
      // Mostrar controles CRUD si el usuario es Administrador
  };

  // Cargar los productos al iniciar la página
  loadProducts();


});
