import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { fetchProfile, saveProfile } from "../../api/Myaccountapi";
import type { AppDispatch, RootState } from "../../store/store";

const IMAGE_BASE = `${import.meta.env.VITE_API_URL}/images/`;

const MyAccount = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { profile, loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!profile) {
            const userId = Number(localStorage.getItem("userId"));
            if (userId) dispatch(fetchProfile(userId));
        }
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: profile?.firstName ?? "",
            lastName: profile?.lastName ?? "",
            email: profile?.email ?? "",
            phoneNumber: profile?.phoneNumber ?? "",
            dob: profile?.dob ?? "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            phoneNumber: Yup.string(),
            dob: Yup.string(),
        }),
        onSubmit: (values) => {
            dispatch(saveProfile({ userId: profile!.userId, ...values }));
        },
    });

    const getInitials = () => {
        if (formik.values.firstName && formik.values.lastName)
            return `${formik.values.firstName[0]}${formik.values.lastName[0]}`.toUpperCase();
        if (profile?.userName) return profile.userName[0].toUpperCase();
        return "U";
    };

    if (!profile && loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="max-w-[1170px] mx-auto w-[90%] pt-28 pb-16">
            <nav className="text-sm text-zinc-500 mb-8">
                <Link to="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-zinc-900 dark:text-zinc-100">My Account</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full lg:w-56 shrink-0">
                    <p className="text-sm font-semibold mb-2">Manage My Account</p>
                    <div className="pl-2 flex flex-col gap-1">
                        <span className="text-sm text-[#DB4444] font-medium">My Profile</span>
                        <Link to="/account/address" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">Address Book</Link>
                        <Link to="/account/payment" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">My Payment Options</Link>
                    </div>
                    <p className="text-sm font-semibold pt-4 mb-2">My Orders</p>
                    <div className="pl-2 flex flex-col gap-1">
                        <Link to="/account/returns" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">My Returns</Link>
                        <Link to="/account/cancellations" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">My Cancellations</Link>
                    </div>
                    <p className="text-sm font-semibold pt-4">My WishList</p>
                </aside>

                {/* Main card */}
                <div className="flex-1 bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 lg:p-8">
                    {/* Avatar row */}
                    <div className="flex items-center gap-4 mb-6">
                        {profile.image ? (
                            <img
                                src={`${IMAGE_BASE}${profile.image}`}
                                alt="avatar"
                                className="w-16 h-16 rounded-full object-cover border-2 border-[#DB4444]"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-[#DB4444] text-white flex items-center justify-center text-xl font-bold">
                                {getInitials()}
                            </div>
                        )}
                        <div>
                            <p className="font-semibold">
                                {formik.values.firstName || profile.userName} {formik.values.lastName}
                            </p>
                            <p className="text-sm text-zinc-500">{formik.values.email}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {profile.userRoles?.map((r) => (
                                    <span key={r.id} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded">
                                        {r.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-lg font-semibold text-[#DB4444] mb-6">Profile</h2>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="space-y-1">
                                <Label htmlFor="firstName">First name</Label>
                                <Input id="firstName" {...formik.getFieldProps("firstName")} />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <p className="text-xs text-red-500">{formik.errors.firstName}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="lastName">Last name</Label>
                                <Input id="lastName" {...formik.getFieldProps("lastName")} />
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <p className="text-xs text-red-500">{formik.errors.lastName}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email address</Label>
                                <Input id="email" type="email" {...formik.getFieldProps("email")} />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-xs text-red-500">{formik.errors.email}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="phoneNumber">Phone number</Label>
                                <Input id="phoneNumber" {...formik.getFieldProps("phoneNumber")} />
                            </div>
                            <div className="space-y-1 sm:col-span-2">
                                <Label htmlFor="dob">Date of birth</Label>
                                <Input id="dob" type="date" {...formik.getFieldProps("dob")} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button type="button" variant="ghost" onClick={() => formik.resetForm()}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={formik.isSubmitting || loading}
                                className="bg-[#DB4444] hover:bg-[#c03535] text-white"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;