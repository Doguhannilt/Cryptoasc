import React from 'react'

const Navbar = () => {
  return (
      <div>
          

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://cdn-icons-png.flaticon.com/512/7047/7047060.png" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://cdn-icons-png.flaticon.com/512/7047/7047060.png" class="h-10" alt="Cyrptoasc" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Cryptoasc</span>
    </a>

    <div class="block" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="cyrptocurrencies" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cyrptocurrencies</a>
        </li>
        <li>
          <a href="exchanges" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Exchanges</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>


    </div>
  )
}

export default Navbar