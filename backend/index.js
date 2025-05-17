import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './config/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import subCategoryRoutes from './routes/subCategoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import wishListRoutes from './routes/wishListRoutes.js';



dotenv.config()

const app = express();
const PORT = process.env.PORT || 5051;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin: "http://localhost:5173", 
    credentials:true,
}));



app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/subcategories', subCategoryRoutes);
app.use('/products', productRoutes);
app.use('/wishlist',wishListRoutes)


app.listen(PORT,()=>{
    dbConnect();
    console.log(`Listening On ${PORT}`)
})