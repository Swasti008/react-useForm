import {useForm} from 'react-hook-form'
import {DevTool} from "@hookform/devtools"
import './App.css'
 
function App() {
 const form =useForm();
 const {register,control,handleSubmit,formState} = form;
 const {errors} =formState

 const onSubmit =(data)=>{
  console.log('Form Submitted',data)
 }

 return (
   <div className='container'>
    <form onSubmit={handleSubmit(onSubmit)} noValidate className='form'>
     {formState.isSubmitSuccessful?<h1 className='success'>Registration Successful!</h1>:<h1>Registration Form</h1>}
     <div className='field'>
     <label>FirstName</label>
        <input type="text" placeholder='firstname' {...register("firstname",{required:{value:true,message:"Firstname is required"}})}/>
        <p className='error'>{formState.errors?.firstname?.message}</p>
     </div>
     <div className='field'>
     <label>SecondName</label>
        <input type="text" placeholder='secondname' {...register("secondname",{required:{value:true,message:"Secondname is required"}})}/>
        <p className='error'>{errors.secondname?.message}</p>
     </div>
      <div className='field'>
      <label>Email</label>
        <input type="email" placeholder='email' {...register("email",{
          required:{
            value:true,
            message:"Please Enter your Email"
          },
          pattern:{
            value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message:'Invalid email format'
          },
          validate:{
            notAdmin:(fieldValue)=>{
              return (
                fieldValue !=="admin@example.com"||"Enter a different email address"
              );
            },
            notBlackListed: (fieldValue) => {
              return (
                (
                  fieldValue.endsWith("gmail.com") ||
                  fieldValue.endsWith("yahoo.com") ||
                  fieldValue.endsWith("outlook.com") ||
                  fieldValue.endsWith("chitkarauniversity.edu.in")
                ) || "This domain is not supported"
              );
            }
            
          }
        })}/>
        <p className='error'>{errors.email?.message}</p>
      </div>
        <div className='field'>
        <label>Password</label>
        <input type="text" placeholder='password' {...register("password",{required:{value:true,message:"Password is required"},
          validate: {
            checkPassword: (fieldValue) => {
              return fieldValue.length >= 5 || "Password must be more than 4 characters";
            },
            greaterThan: (fieldValue) => {
              return fieldValue.length <= 20 || "Password cannot be more than 20 characters";
            }
          }
        })}/>
        <p className='error'>{errors.password?.message}</p>
        </div>
        
      <button className='submit'>Submit</button>
    </form>
      <DevTool control={control}/>
    </div>
  )
}

export default App
