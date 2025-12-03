import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { API_ENDPOINTS } from "../config/api";
import { toast } from "react-toastify";
import Title from "../Components/Title";
import { FiUser, FiMapPin, FiSave } from "react-icons/fi";

const Profile = () => {
    const navigate = useNavigate();
    const { token, user, updateUser } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    // Rediriger si pas connecté
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    // Pré-remplir le formulaire
    useEffect(() => {
        if (user) {
            reset({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                city: user.city || "",
                state: user.state || "",
                zip: user.zip || "",
                country: user.country || "",
            });
        }
    }, [user, reset]);

    const onSubmit = async (formData) => {
        try {
            const res = await fetch(API_ENDPOINTS.profile, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to update profile");
            }

            updateUser(data.user);
            toast.success("Profile updated!");
        } catch (err) {
            toast.error(err.message);
        }
    };

    const inputClass = "w-full border px-4 py-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none";

    if (!user) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <Title text1="My" text2="Profile" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
                
                {/* Personal Info */}
                <div className="bg-white border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <FiUser /> Personal Information
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                className={inputClass}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className={inputClass}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input
                                {...register("phone")}
                                placeholder="Phone Number"
                                className={inputClass}
                            />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="bg-white border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <FiMapPin /> Address
                    </h3>

                    <div className="space-y-4">
                        <input
                            {...register("address")}
                            placeholder="Street Address"
                            className={inputClass}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <input {...register("city")} placeholder="City" className={inputClass} />
                            <input {...register("state")} placeholder="State" className={inputClass} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input {...register("zip")} placeholder="Zip Code" className={inputClass} />
                            <input {...register("country")} placeholder="Country" className={inputClass} />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 disabled:bg-gray-400"
                >
                    <FiSave />
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default Profile;