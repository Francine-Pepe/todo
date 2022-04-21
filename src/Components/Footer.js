import React from 'react';

export default function Footer() {

    const getCurrentYear = () => {
        return new Date().getFullYear();
      };
    

    return (
        <>
        <footer className='footer_container'>
            <small>Created by: Francine Pêpe 🙂 - {getCurrentYear()}</small>
        </footer>
        
        </>

    );
}