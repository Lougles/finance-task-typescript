import './Footer.module.css'
export const Footer = () => {
    const year = new Date().getFullYear();
    return <footer>{`Copyright © Vova Chelidze ${year}`}</footer>;
}