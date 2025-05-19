import styled from 'styled-components';

export const LayoutContainer =  styled.div`
    
    border: 2px solid red;
    max-width: 74rem;
    height: calc(100vh - 10rem);
    margin: 5rem auto;  

    background-color: ${props => props.theme['gray-800']};
    padding: 2.5rem;
    border-radius: 8px;
    
    display: flex;
    flex-direction: column;

`;