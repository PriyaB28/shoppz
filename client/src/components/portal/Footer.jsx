import React from 'react'

const Footer = () => {
    return (
        <footer className="mt-auto py-4 bg-white dark:bg-bodybg text-center border-t border-defaultborder dark:border-defaultborder/10">
            <div className="container">
                <span className="text-textmuted dark:text-textmuted/50">
                    Copyright © <span id="year"></span>
                    <a href="#" className="text-dark font-medium">Xintra</a>.
                    Designed with <span className="text-danger">&#10084;</span> by
                    <a href="#">
                        <span className="font-medium text-primary">Spruko</span>
                    </a>
                    All rights reserved
                </span>
            </div>
        </footer>
    )
}

export default Footer