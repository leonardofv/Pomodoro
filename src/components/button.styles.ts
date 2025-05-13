import styled from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
    variant: ButtonVariant;
}

const buttonVariants = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    success: 'green',
};


                                            //ButtonContainer receber as props
export const ButtonContainer = styled.button<ButtonContainerProps>`

    width: 100px;
    height: 40px;
    cursor: pointer;

    //interpolação
    ${props => {
        return `
            background-color: ${buttonVariants[props.variant]}
        `
    }}

`