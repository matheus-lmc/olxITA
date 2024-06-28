"use client"

import Image from "next/image";

import Header from "@/components/Header";
import userImg from "../../../assets/user.png"

import { Phone } from "lucide-react";

import { useEffect, useState } from "react";
import { ListingType, UserType } from "@/app/page";
import { useRouter } from "next/navigation";


export default function Listing({ params } : { params: { id: string } }) {
    const id = params.id;
    const router = useRouter();

    const [listing, setListing] = useState<ListingType | null>(null);
    const [user, setUser] = useState<UserType | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const fetchListing = async () => {
            const response = await fetch(`/api/listings/${id}`, {
                method: "GET"
            });

            const data = await response.json();

            setListing(data.listing);

            console.log(data.listing)
        }

        const fetchUser = async () => {
            const response = await fetch(`/api/get-listing-user/${id}`, {
                method: "GET"
            });

            const data = await response.json();

            setUser(data.user);

            console.log(data.user)
        }

        fetchUser();
        fetchListing();
    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-zinc-100">
            <Header />
            <main className="flex pt-16 px-48 gap-4">
                { listing && (
                    <div className="flex flex-col gap-4">
                        {listing.images.map((image, index) => (
                            <div
                                key={index}
                                className="aspect-square relative cursor-pointer"
                                style={{ width: 130, height: 130 }}
                                onClick={() => setSelectedImage(index)}
                            >
                                <div className={`absolute inset-0 bg-black ${selectedImage == index ? 'border-2 border-[#FFDB58]' : 'opacity-60'} hover:opacity-100 transition-opacity`}>
                                    <Image
                                        src={`/${image}`}
                                        alt={`Image ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                { listing && (
                    <div className="flex gap-12">
                        <div className="rounded-lg aspect-square relative" style={{ width: 500, height: 500 }}>
                            <Image
                                src={`/${listing.images[selectedImage]}`}
                                alt="Listing"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-4xl text-[#154360]">{listing.title}</p>
                            <p>{listing.description}</p>
                            <div className="flex items-baseline">
                                <p>R$</p>
                                <strong className="text-4xl text-[#22C55E] mx-2">{listing.price.toLocaleString('pt-BR')}</strong>
                            </div>
                            <div className="my-10">
                                <div className="flex items-center gap-4">
                                    <Image src={userImg} alt="user" width={83} height={83}/>
                                    <div>
                                        <p className="font-medium">{user?.name}</p>
                                        <p className="font-thin">{user?.nickname} - T{user?.userClass}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => {router.push(`https://wa.me/55${user?.phone}`)}} className="bg-[#22C55E] flex gap-4 text-white p-2 rounded hover:opacity-80">
                                    <Phone />
                                    <strong>Whatsapp</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
