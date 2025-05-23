import { FormContainer, HomeContainer, CountDownContainer, Separator, StartCountDownButton, TaskInput, MinitesAmountInput } from './styles';

import { Play } from "phosphor-react";



export function Home() {
    return (
       <HomeContainer>
        <form action="">
           <FormContainer>
               <label htmlFor="task">Vou trabalhar em</label>
               <TaskInput 
                    id="task"
                    list='task-suggestions' 
                    placeholder='dê um nome para sua tarefa'
                />

                <datalist id='task-suggestions'>
                    <option value="values 1" />
                    <option value="values 2" />
                    <option value="values 3" />
                    <option value="values 4" />    
                </datalist>        

               <label htmlFor="minutesAmount">durante</label>
               <MinitesAmountInput 
                    type="number" 
                    id="minutesAmount" 
                    placeholder='00'
                    min={0}
                    max={120}
                    step={5}
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

            <StartCountDownButton disabled type="submit">
                <Play size={24} />
                Começar
            </StartCountDownButton>
        </form>
       </HomeContainer> 
    )
}