import { screen, render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App'

describe('<App />', ()=>{
    it('<App/> renders properly', ()=>{
        render(<App />)
        const title = screen.getByText(/CV Application/i);
        const subTitle1 = screen.getByText(/education/i);
        const subTitle2 = screen.getByText(/experiance/i);
        const subTitle3 = screen.getByText(/preview/i);

        expect(title).toBeInTheDocument();

    })
})