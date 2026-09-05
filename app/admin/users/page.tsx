"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Users,
  ShieldCheck,
  User,
  Car,
  Search,
  CheckCircle2,
  Phone,
  Mail,
  MessageCircle,
  Shield,
} from "lucide-react";
import { UserProfile, UserRole } from "@/types";

const INITIAL_USERS: UserProfile[] = [
  {
    id: "user-1",
    full_name: "Victoria Motors Kampala",
    email: "sales@victoriamotors.ug",
    phone: "+256770864985",
    whatsapp: "+256770864985",
    role: "seller",
    avatar_url:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
    is_verified: true,
    created_at: "2024-01-15T09:00:00Z",
  },
  {
    id: "user-2",
    full_name: "Kampala Prestige Auto",
    email: "info@prestigeauto.ug",
    phone: "+256752345678",
    whatsapp: "+256752345678",
    role: "seller",
    avatar_url:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    is_verified: true,
    created_at: "2024-02-10T11:30:00Z",
  },
  {
    id: "user-3",
    full_name: "David Okello",
    email: "david.okello@gmail.com",
    phone: "+256703998877",
    whatsapp: "+256703998877",
    role: "seller",
    avatar_url:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    is_verified: false,
    created_at: "2024-03-01T14:15:00Z",
  },
  {
    id: "user-4",
    full_name: "Sarah Nsubuga",
    email: "sarah.nsubuga@outlook.com",
    phone: "+256701122334",
    whatsapp: "+256701122334",
    role: "buyer",
    avatar_url:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    is_verified: true,
    created_at: "2024-03-20T16:45:00Z",
  },
  {
    id: "user-5",
    full_name: "Admin Supervisor",
    email: "admin@autolink.ug",
    phone: "+256788990011",
    whatsapp: "+256788990011",
    role: "admin",
    avatar_url:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
    is_verified: true,
    created_at: "2023-11-01T08:00:00Z",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        u.full_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
    );
  };

  const handleToggleVerified = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, is_verified: !u.is_verified } : u,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-border/60">
        <h1 className="font-display text-2xl font-extrabold text-white">
          User &amp; Dealership Directory
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage buyer, seller, and administrator accounts, assign access
          privileges, and verify registered dealerships.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {(["all", "buyer", "seller", "admin"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                roleFilter === r
                  ? "bg-blue-600 text-white"
                  : "bg-surface-200 text-slate-300 hover:bg-surface-100"
              }`}
            >
              {r === "all" ? "All Roles" : `${r}s`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-xl border border-border bg-surface-200 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl border border-border bg-surface-300 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-200/60 text-slate-400 uppercase tracking-wider font-bold border-b border-border">
              <tr>
                <th className="p-4">User Details</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Current Role</th>
                <th className="p-4 text-center">Verified Status</th>
                <th className="p-4 text-right">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-surface-200/40 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden bg-surface-200 shrink-0 border border-border">
                        <Image
                          src={
                            u.avatar_url ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
                          }
                          alt={u.full_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-bold text-white truncate max-w-[180px]">
                            {u.full_name}
                          </p>
                          {u.is_verified && (
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-0.5 text-[11px] text-slate-300">
                      <div>Phone: {u.phone || "N/A"}</div>
                      <div className="text-whatsapp">
                        WA: {u.whatsapp || "N/A"}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        u.role === "admin"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : u.role === "seller"
                            ? "bg-gold-500/10 text-gold-400 border border-gold-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleVerified(u.id)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition-colors ${
                        u.is_verified
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-surface-200 text-slate-400 hover:text-white"
                      }`}
                    >
                      {u.is_verified ? "Verified ✓" : "Unverified"}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={u.role}
                      onChange={(e) =>
                        handleRoleChange(u.id, e.target.value as UserRole)
                      }
                      className="rounded-xl border border-border bg-surface-200 px-3 py-1 text-xs font-semibold text-white focus:outline-none focus:border-gold-400"
                    >
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
