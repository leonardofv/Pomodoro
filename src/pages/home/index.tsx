import { useForm } from 'react-hook-form';
import { Play } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'; 
import { useState } from 'react';
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

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
}

export function Home() {
//                             tipo do useState, um array de Cycle       
    const [ cycles, setCycles ] = useState<Cycle[]>([]); //iniciando como um array vazio de cycles
    const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null); //str or null porque no início da aplicação não tem nenhum ciclo ativo
    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0); //armazenar segundos que já se passaram desde o início do ciclo


    //desestruturação  do useForm              valores da interface no defaultValues      
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    function handleCreateNewCycle(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
        }
        setCycles((state) => [...state, newCycle]);  //pego o estado atual da variável de ciclos, copia o estado atual e adicona o novo ciclo
        setActiveCycleId(newCycle.id);
        reset(); //usar defalt values para resetar o formulário para default
    }
    
    const activeCycle = cycles.find((cycle) =>  cycle.id === activeCycleId); //se o ciclo ativo é igual ao id do ciclo ativo, retorna o ciclo ativo

    //se ciclo ativo, retorna o total de segundos do ciclo ativo.
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; 
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60); //minutos inteiros
    const secondsAmount = currentSeconds % 60; // resto da visião dos segundos por 60 para pegar os segundos
//
    //se for menor que 10, adiciona um 0 na frente
    const minutes = String(minutesAmount).padStart(2, '0'); 
    const seconds = String(secondsAmount).padStart(2, '0');


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
            {/* trabalhando com strings como se forrem arrays nos minutes e seconds */}
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
           </CountDownContainer>

            <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                <Play size={24} />
                Começar
            </StartCountDownButton>
        </form>
       </HomeContainer> 
    )
}