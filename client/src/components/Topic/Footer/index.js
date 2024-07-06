import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#151C25] text-[#E32970] p-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="foot-col-1">
                    <p>Lorem ipsum dolor sit amet, feugiat delicat liberavisse id cum no quo. Lorem ipsum dolor sit amet, feugiat delicat liberavisse id cum no quo. 
                        Lorem ipsum dolor sit amet, feugiat delicat liberavisse id cum no quo.</p>
                </div>

                <div className="foot-col-2">
                    <h4 className="font-bold mb-4">Navigation</h4>
                    <ul>
                        <li><a href="#" className="hover:text-pink-500">Home</a></li>
                        <li><a href="#" className="hover:text-pink-500">Overview</a></li>
                        <li><a href="#" className="hover:text-pink-500">About</a></li>
                        <li><a href="#" className="hover:text-pink-500">Buying Options</a></li>
                        <li><a href="#" className="hover:text-pink-500">Support</a></li>
                    </ul>
                </div>

                <div className="foot-col-3">
                    <h4 className="font-bold mb-4">Extended Navigation</h4>
                    <ul>
                        <li><a href="#" className="hover:text-pink-500">More</a></li>
                        <li><a href="#" className="hover:text-pink-500">More</a></li>
                        <li><a href="#" className="hover:text-pink-500">More</a></li>
                        <li><a href="#" className="hover:text-pink-500">More</a></li>
                        <li><a href="#" className="hover:text-pink-500">More</a></li>
                    </ul>
                </div>

                <div className="foot-col-4">
                    <h4 className="font-bold mb-4">Info</h4>
                    <p>Wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex commodo consequat. Autem vel hendrerit iriure dolor in hendrerit.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;