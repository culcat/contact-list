import React, {useEffect, useState} from 'react'
import { Icon } from '@iconify/react';
function Form(){
    function getRandom(min:number,max:number){
        return Math.floor(Math.random() * (max-min+1))+min;
    }
    let idRand = getRandom(1,200000)
    const [formData, setFormData]  = useState({
        id: idRand,
        name:'',
        phone:''
    })
    const [formList, setFormList]= useState<any[]>([])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement >)=>{
        setFormData({ ...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e: React.FormEvent) =>{
        alert('Данные записаны')
        e.preventDefault()
        const newFormList=[...formList,formData]
        setFormList(newFormList)
        localStorage.setItem('formList', JSON.stringify(newFormList))
        setFormData({
            id: idRand,
            name:'',
            phone: ''
        })
    }

    const deleteContact = (idToDelete:string) => {
        const storedData =localStorage.getItem('formList')
        const parsedData = JSON.parse(storedData || '[]');
        const updateData = parsedData.filter((item: { id: string; }) =>item.id !== idToDelete)
        localStorage.setItem('formList',JSON.stringify(updateData))
        setFormList(updateData);
    }
    useEffect(() => {
            const storedData = localStorage.getItem('formList')
            if(storedData){
             const parsedData =  JSON.parse(storedData)
            setFormList(parsedData)
                if (parsedData.length>0){
                    const lastFormData = parsedData[parsedData.length -1]
                    setFormData(lastFormData)
                }
            }
        },[]
    )
    return(
        <>

        <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Введите имя' name='name' onChange={handleChange}/>
            <input type='tel' name='phone' placeholder='Введите номер' onChange={handleChange}/>
            <button type='submit'>Сохранить</button>
            <div>
                {formList.map((form, index) => (
                    <div key={form.id}>
                        <span>Имя: {form.name} Номер: {form.phone}</span>
                        <button type="button" onClick={() => deleteContact(form.id)}><Icon icon="mdi:bin-outline" />
                        </button>
                    </div>
                ))}
            </div>
        </form>


        </>
    )
}
export default Form