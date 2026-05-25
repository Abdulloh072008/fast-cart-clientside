import { Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-black text-white font-sans">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-8">

          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-wider">{t('footer.exclusive')}</h2>
            <h3 className="text-base font-medium">{t('footer.subscribe')}</h3>
            <p className="text-sm text-gray-300">{t('footer.get_exclusive')}</p>
            <div className="relative flex max-w-[250px] items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded border border-white bg-transparent py-2 pl-4 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white"
              />
              <button
                type="submit"
                className="absolute right-3 text-white hover:text-gray-300 transition-colors"
                aria-label="Submit email"
              >
                <Send size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold">{t('footer.support')}</h2>
            <address className="not-italic text-sm text-gray-300 leading-relaxed space-y-2">
              <p>111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh.</p>
              <p className="hover:text-white transition-colors">
                <a href="mailto:exclusive@gmail.com">exclusive@gmail.com</a>
              </p>
              <p>+88015-88888-9999</p>
            </address>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold">{t('footer.account')}</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#my-account" className="hover:text-white transition-colors">{t('footer.my_account')}</a></li>
              <li><a href="#cart" className="hover:text-white transition-colors">{t('footer.cart')}</a></li>
              <li><a href="#wishlist" className="hover:text-white transition-colors">{t('footer.wishlist')}</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">{t('footer.shop')}</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold">{t('footer.quick_link')}</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#privacy-policy" className="hover:text-white transition-colors">{t('footer.privacy_policy')}</a></li>
              <li><a href="#terms-of-use" className="hover:text-white transition-colors">{t('footer.terms_of_use')}</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">{t('footer.faq')}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold">{t('footer.social')}</h2>
            <div className="flex items-center gap-4 pt-1">
              <a href="#twitter" className=" hover:text-gray-600" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#instagram" className=" hover:text-gray-600" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="#linkedin" className=" hover:text-gray-600 " aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-500">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}