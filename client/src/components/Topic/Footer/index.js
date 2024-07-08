"use client";

import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function Component() {
    return (
        <Footer bgDark>
            <div className="w-full">
                <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
                    <div>
                        <Footer.Title title="Company" className="text-sm text-[#E32970]" />
                        <Footer.LinkGroup col className="text-sm text-[#f1eeef]">
                            <Footer.Link href="#">About</Footer.Link>
                            <Footer.Link href="#">Careers</Footer.Link>
                            <Footer.Link href="#">Brand Center</Footer.Link>
                            <Footer.Link href="#">Blog</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title="Help Center" className="text-sm text-[#E32970]" />
                        <Footer.LinkGroup col className="text-sm text-[#e9e5e7]">
                            <Footer.Link href="#">Discord Server</Footer.Link>
                            <Footer.Link href="#">Twitter</Footer.Link>
                            <Footer.Link href="#">Facebook</Footer.Link>
                            <Footer.Link href="#">Contact Us</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title="Legal" className="text-sm text-[#E32970]" />
                        <Footer.LinkGroup col className="text-sm text-[#ece8e9]">
                            <Footer.Link href="#">Privacy Policy</Footer.Link>
                            <Footer.Link href="#">Licensing</Footer.Link>
                            <Footer.Link href="#">Terms & Conditions</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title="Download" className="text-sm text-[#E32970]" />
                        <Footer.LinkGroup col className="text-sm text-[#eeeaeb]">
                            <Footer.Link href="#">iOS</Footer.Link>
                            <Footer.Link href="#">Android</Footer.Link>
                            <Footer.Link href="#">Windows</Footer.Link>
                            <Footer.Link href="#">MacOS</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
                <div className="w-full bg-gray-900 px-4 py-6 sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Pinetree™" year={2024} className="text-sm" />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook} />
                        <Footer.Icon href="#" icon={BsInstagram} />
                        <Footer.Icon href="#" icon={BsTwitter} />
                        <Footer.Icon href="#" icon={BsGithub} />
                        <Footer.Icon href="#" icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}