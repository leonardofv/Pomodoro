import { useForm } from 'react-hook-form';
import { Play } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'; 
import { FormContainer, 
         HomeContainer, 
         CountDownContainer, 
         Separator, 
         StartCountDownButton, 
         TaskInput, 
         MinutesAmountInput
        } from './styles';


// zod.object porque o o data quando cria um novo ciclo é um objeto
const newCycleFormValidationSchema = zod.object({
    task:  zod
        .string()
        .min(1, 'Informe a terefa'),
    minutesAmount: zod
        .number()
        .min(5, 'Ciclo de no minimo 5 minutos')
        .max(60, 'Ciclo de no máximo 60 minutos'),
});


interface NewCycleFormData {
    task: string
    minutesAmount: number
}

export function Home() {

    //desestruturação  do useForm              valores da interface no defaultValues      
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    function handleCreateNewCycle(data: NewCycleFormData) {
        console.log(data);
        reset();
    }

    const task = watch('task'); //observando valor do input task
    const isSubmitDisabled = !task; //botão desativado quando o input estiver vazio

    return (
       <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
           <FormContainer>
               <label htmlFor="task">Vou trabalhar em</label>
               <TaskInput 
                    id="task"
                    list='task-suggestions' 
                    placeholder='dê um nome para sua tarefa'
                    {...register('task')}
                />

                <datalist id='task-suggestions'>
                    <option value="values 1" />
                    <option value="values 2" />
                    <option value="values 3" />
                    <option value="values 4" />    
                </datalist>        

               <label htmlFor="minutesAmount">durante</label>
               <MinutesAmountInput 
                    type="number" 
                    id="minutesAmount" 
                    placeholder='00'
                    // min={5}
                    // max={60}
                    // step={5}
                    {...register('minutesAmount', {valueAsNumber: true})}
                />

               <span>minutos.</span>
           </FormContainer>

           <CountDownContainer>
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
           </CountDownContainer>

            <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                <Play size={24} />
                Começar
            </StartCountDownButton>
        </form>
       </HomeContainer> 
    )
}