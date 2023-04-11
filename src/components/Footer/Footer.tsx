import './Footer.module.css'
import {FC} from "react";
export const Footer: FC = () => {
    const year = new Date().getFullYear();
    return <footer>{`Copyright © Vova Chelidze ${year}`}</footer>;
}