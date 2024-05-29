import express from 'express'
const app = express()
import alunoRouter from './backend/routes/alunoRouter.js'


//app.use(alunoRouter)
app.use(alunoRouter)

app.listen(3000, () => {
    console.log('Escutando na porta 3000...')
})