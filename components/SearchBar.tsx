"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

const SearchBar = () => {
    const [searchPrompt, setSearchPrompt] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const isValidAmazonProductUrl = (url: string) => {
      try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;

        if(
          hostname.includes('amazon.com') || 
          hostname.includes('amazon.') || 
          hostname.endsWith('amazon')
        ) {
          return true;
        }
      } catch (error) {
        return false;
      }
      return false;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isValidLink = isValidAmazonProductUrl(searchPrompt);

      if(!isValidLink) return alert('Please provide a valid Amazon link');

      try {
        setLoading(true);

        // Scrape the product page
        const product = await scrapeAndStoreProduct(searchPrompt);
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input
            type='text'
            placeholder='Enter product link'
            className='searchbar-input'
            onChange={(e) => setSearchPrompt(e.target.value)}
        />
        <button type='submit' className='searchbar-btn' disabled={searchPrompt === ''}>
          {loading ? 'Searching...' : 'Search'}
        </button>
    </form>
  )
}

export default SearchBar