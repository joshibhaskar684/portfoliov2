"use client"
import { FaRobot } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useState } from "react";

// The chat modal pulls in MUI, react-markdown and axios. Loading it on the
// first click keeps all of that out of the JavaScript every page ships.
const AiModal = dynamic(() => import("../Modal/AiModal"));

export default function AiBot(){
    const [ openModal,setOpenModal]=useState(false);
    // Stays true once opened, so closing the modal keeps the conversation.
    const [hasOpened, setHasOpened] = useState(false);

    const handleOpen = () => {
        setHasOpened(true);
        setOpenModal(true);
    };

    return(
        <>
        <button onClick={handleOpen} aria-label="Open AI assistant" className="cursor-pointer border bg-blue-500 fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full flex items-center justify-center">
          <FaRobot className="text-3xl "/>
        </button>

{hasOpened && <AiModal openModal={openModal} setOpenModal={setOpenModal} />}
        </>
    )
}
