
export const companyRoutes = {
    getCompany: 'http://localhost:3000/company/',
    getUserCompany: 'http://localhost:3000/company/users',
    registerCompany: 'http://localhost:3000/company/register',
}

export const userRoutes = {
    login: 'http://localhost:3000/auth/login',
    register: 'http://localhost:3000/auth/register',
}

export const supplierRoutes = {
    get: 'http://localhost:3000/supplier/',
    register: 'http://localhost:3000/supplier/register',
}

export const productRoutes = {
    get: 'http://localhost:3000/product/',
    register: 'http://localhost:3000/product/register'
}

export const pythonRoutes = {
    userRegisters : 'http://localhost:3000/apiPython/user/',
    getRecommendations : 'http://localhost:3000/apiPython/recommendations/', //:cantidad/:categoria
    getProducts: 'http://localhost:3000/apiPython/products',
    getProductsCategories : 'http://localhost:3000/apiPython/productsCategorie',
}

export const purchaseRoutes = {
    buyProduct: 'http://localhost:3000/purchase/register',
    getPurchase: 'http://localhost:3000/purchase/get/',
}