import { screen, render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App'
import { notDeepEqual } from 'assert';

describe('<App />', ()=>{
    it('<App/> renders properly', ()=>{
        render(<App />)
        const title = screen.getByText(/CV Application/i);
        const subTitle1 = screen.getAllByText(/Education/i)[0];
        const subTitle2 = screen.getAllByText(/experiance/i)[0];
        const subTitle3 = screen.getByText(/preview/i);

        expect(title).toBeInTheDocument(); 
        expect(subTitle1).toBeInTheDocument(); 
        expect(subTitle2).toBeInTheDocument(); 
        expect(subTitle3).toBeInTheDocument(); 
    })
})

describe('<PersonalInfo />', ()=>{
    it('ensuring toggling of form', ()=>{
        render(<App />)
        // get toggle btn
        const toggleBtn = screen.getByText(/\+ Update Personal Information/i)

        expect(toggleBtn).toBeInTheDocument();

        userEvent.click(toggleBtn)
        // form should be showing, toggle btn removed
        const form = screen.getByTestId(/personal-form/i)

        expect(toggleBtn).not.toBeInTheDocument()
        expect(form).toBeInTheDocument()
    })

    it('when "clear" btn is clicked, inputs to form should be cleared', ()=>{
        render(<App />)
        const toggleBtn = screen.getByText(/\+ Update Personal Information/i)
        // reveal form
        userEvent.click(toggleBtn)
        // get inputs
        const inputFirstName = screen.getByPlaceholderText(/first name/i);
        const inputPhone = screen.getByPlaceholderText(/Phone/i);
        // get clear btn
        const clearBtn = screen.getByText(/clear/i);
        
        // input info
        userEvent.type(inputFirstName, 'Tom');
        userEvent.type(inputPhone, '567-789-1234');

        expect(inputFirstName.value).toBe('Tom');
        expect(inputPhone.value).toBe('567-789-1234');

        userEvent.click(clearBtn)

        // inputs should be clear

        expect(inputFirstName.value).toBe('');
        expect(inputPhone.value).toBe('');
        
    })

    it("when update btn is clicked, form should be removed",()=>{
        render(<App />)
        const toggleBtn = screen.getByText(/\+ Update Personal Information/i)
        // reveal form
        userEvent.click(toggleBtn)

        const form = screen.getByTestId(/personal-form/i)
        const updateBtn = screen.getByRole('button', {name: /update/i})

        userEvent.click(updateBtn);

        expect(form).not.toBeInTheDocument();

    })
})

describe('<Education />', ()=>{
    it("ensuring toggling of form", ()=>{
        render(<App />)
        const toggleBtn = screen.getByText(/\+ add to education/i)
        expect(toggleBtn).toBeInTheDocument();
        userEvent.click(toggleBtn)

        const form = screen.getByTestId(/school-form/i)

        expect(toggleBtn).not.toBeInTheDocument()
        expect(form).toBeInTheDocument()
    })

    it('when cancel btn is clicked, form should be removed', ()=>{
        render(<App />)
        const toggleBtn = screen.getByText(/\+ add to education/i);
        userEvent.click(toggleBtn)

        const form = screen.getByTestId(/school-form/i);
        const cancelBtn = screen.getByRole('button', {name: /cancel/i});

        userEvent.click(cancelBtn);

        expect(form).not.toBeInTheDocument();

    })

    describe('<EducationDisplay />', ()=>{
        it('when update btn is click, education display should update', ()=>{
            render(<App />)
            const toggleBtn = screen.getByText(/\+ add to education/i);
        userEvent.click(toggleBtn)

        const addBtn = screen.getAllByRole('button', {name: /add/i})[0];
        userEvent.click(addBtn)

        const degreeElement = screen.getAllByText('Degree:')[0];

        expect(degreeElement).toBeInTheDocument()

        })
    })
})

describe('<Expeiance />', ()=>{
    it("ensuring toggling of form", ()=>{
        render(<App />)
        const toggleBtn = screen.getByText(/\+ add to work history/i)
        expect(toggleBtn).toBeInTheDocument();
        userEvent.click(toggleBtn)

        const form = screen.getByTestId(/experiance-form/i)

        expect(toggleBtn).not.toBeInTheDocument()
        expect(form).toBeInTheDocument()
    })

    it('when cancel btn is clicked, form should be removed', ()=>{
        render(<App />)
        const toggleBtn = screen.getByText(/\+ add to work history/i)
        userEvent.click(toggleBtn)

        const form = screen.getByTestId(/experiance-form/i)
        const cancelBtn = screen.getByRole('button', {name: /cancel/i});

        userEvent.click(cancelBtn);

        expect(form).not.toBeInTheDocument();

    })

    describe('<ExperianceDisplay />', ()=>{
        it('when update btn is click, experiance display should update', ()=>{
            render(<App />)
            const toggleBtn = screen.getByText(/\+ add to work history/i)
            userEvent.click(toggleBtn)

            const addBtn = screen.getAllByRole('button', {name: /add/i})[1];
            userEvent.click(addBtn)

            const companyElement = screen.getByText(/Company:/i);
            
            expect(companyElement).toBeInTheDocument()

        })
    })
})