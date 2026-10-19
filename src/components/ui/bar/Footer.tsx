import { CiFacebook } from "react-icons/ci"
import { FaFacebook, FaInstagram } from "react-icons/fa"

const Footer = () => {
  return (
    <footer>
        <section className="flex flex-col md:flex-row justify-between gap-4 p-4 max-w-6xl mx-auto"> 
        <div className="">Logo</div>
        <div className="">
            <span className="font-bold">Navigation</span>
            <ul className="flex flex-col gap-2">
                <li className="hover:underline">Menu</li>
                <li className="hover:underline">About us</li>
                <li className="hover:underline">Contact us</li>
                <li className="hover:underline">Main Dishes</li>
            </ul>
            </div>
        <div className="">
            <span className="font-bold">Dishes</span>
             <ul className="flex flex-col gap-2">
                <li className="hover:underline">Momo</li>
                <li className="hover:underline">Momo</li>
                <li className="hover:underline">Momo</li>
                <li className="hover:underline">Momo</li>
            </ul>
        </div>
        <div className="">
            <span className="font-bold">Follow Us</span>
            <ul className="flex gap-4 mt-2">
                <FaFacebook className="w-8 h-8" />
                <FaInstagram className="w-8 h-8" />
            </ul>
        </div>
        </section>
    </footer>
  )
}

export default Footer