import { getUsers } from "@/lib/action";
import React from "react";

async function AllUsersPage() {
  const users = await getUsers();

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8 transition-colors duration-300">
      <div className="w-full mx-auto">
        {/* Animated Header Section */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl dark:shadow-2xl p-6 md:p-8 border border-white/50 dark:border-gray-700/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-xl shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      User Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Manage and monitor your registered users
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-4">
                <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700/50">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-500 dark:bg-blue-400 rounded-lg">
                      <svg
                        className="w-4 h-4 text-white dark:text-gray-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Users
                      </p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {users.length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-linear-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 rounded-xl p-4 border border-green-200 dark:border-green-700/50">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-500 dark:bg-green-400 rounded-lg">
                      <svg
                        className="w-4 h-4 text-white dark:text-gray-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Verified
                      </p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {users.filter((u) => u.emailVerified).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Card with Glass Effect */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl dark:shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden">
          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="bg-linear-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-750">
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-blue-500 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      User
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-purple-500 dark:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Email
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-500 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Status
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-orange-500 dark:text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Created At
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-red-500 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Actions
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="group hover:bg-linear-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300"
                  >
                    {/* User Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-xl bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-blue-500 dark:via-purple-600 dark:to-pink-600 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <div className="h-full w-full rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center">
                              <span className="text-lg font-bold bg-linear-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 dark:bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                            #{user._id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Email Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400 dark:text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {user.email}
                        </span>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.emailVerified ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold border border-green-200 dark:border-green-700/50">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-semibold border border-yellow-200 dark:border-yellow-700/50">
                          <svg
                            className="w-3.5 h-3.5 animate-pulse"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <div className="font-medium dark:text-gray-300">
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(user.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/50 dark:hover:to-blue-700/50 rounded-lg transition-all duration-200 hover:shadow-md dark:hover:shadow-blue-900/20 group/btn">
                          <svg
                            className="w-4 h-4 text-blue-600 dark:text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button className="p-2 bg-linear-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 hover:from-red-100 hover:to-red-200 dark:hover:from-red-800/50 dark:hover:to-red-700/50 rounded-lg transition-all duration-200 hover:shadow-md dark:hover:shadow-red-900/20 group/btn">
                          <svg
                            className="w-4 h-4 text-red-600 dark:text-red-400 group-hover/btn:scale-110 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {users.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 mb-6">
                <svg
                  className="w-10 h-10 text-blue-500 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No users yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Users will appear here once they register.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="bg-linear-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-750 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {users.length}
                </span>{" "}
                users
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  Last updated:
                </span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUsersPage;
