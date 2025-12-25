export const Auth= (req,res,next)=>{
const toxen='xyz';
const isAuther= toxen==='xyz';
if(!isAuther){
res.status(401).send('not has authorized')
}
next()


}