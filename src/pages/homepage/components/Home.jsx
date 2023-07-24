import React from 'react'
import Logo from '../../../assets/images/logo.svg'
import HeroSectionFarm from '../../../assets/images/hero-section-farm.svg'
import Image_two from '../../../assets/images/secondImage.svg'
import Simplicity from '../../../assets/images/simplicity.svg'
import Speed from '../../../assets/images/speed.svg'
import Transparency from '../../../assets/images/transparency.svg'
import Diversity from '../../../assets/images/diversity.svg'
import Support from '../../../assets/images/support.svg'
import Farmers from '../../../assets/images/farmers.svg'
import { useNavigate } from 'react-router-dom'
import '../styles/homePage.css'


const HeroSection = () => {
    const navigate = useNavigate();

    const handleLogIn = (e) => {
        navigate('/login')
    }

    const handleRegistration = (e) => {
        navigate('/registration')
    }

    return (
        <div className='homePageContainer'>
            <div className='w-full h-full'>
                <nav className='sticky top-0 shadow-lg'>
                    <div className='w-full h-[80px] flex justify-between items-center px-[56px] bg-white'>
                        <div>
                            <img src={Logo} alt='cultify-logo' className='w-auto h-[55px]'></img>
                        </div>

                        <div className='flex gap-[10px] justify-center items-center'>
                            <p className='max-w-xs transition duration-300 ease-in-out hover:scale-110'> Home </p>
                            <p className='max-w-xs transition duration-300 ease-in-out hover:scale-110'> About us </p>
                            <p className='max-w-xs transition duration-300 ease-in-out hover:scale-110'> Contact us </p>
                            <p className='rounded-lg border-solid border-[2px] px-4 py-2 max-w-xs transition duration-300 ease-in-out hover:scale-110
                        hover:bg-custom-green hover:text-white hover:border-0' onClick={handleLogIn}> Sign in </p>
                            <p className='rounded-lg border-solid border-[2px] max-w-xs transition duration-300 ease-in-out
                         hover:scale-110 text-white bg-custom-green px-4 py-2 hover:text-black
                          hover:bg-white hover:border-2 hover:border-black' onClick={handleRegistration}> Get started </p>
                        </div>
                    </div>
                </nav>

                <div className='w-full-[50px] min-h-[100vh] flex justify-center items-center gap-[20px] px-[56px] bg-[#C1DDEB]/20'>
                    <div className='max-w-[680px]'>
                        <div>
                            <p className='text-[40px] font-bold text-custom-blue '>
                                Invest in Farms with Ease,<div className='text-custom-green inline-block'>Seamlessly </div> Connecting You to Agriculture.
                            </p>
                        </div>

                        <div className='my-[21px]'>
                            <p className='text-[20px] text-custom-blue'>
                                Invest confidently in the agriculture industry. Explore our platform, find exciting farm investment opportunities,
                                and enjoy the benefits of a thriving sector. Start growing your wealth through agricultural investments today.
                            </p>
                        </div>
                        <div className=''>
                            <button className='rounded-lg border-solid border-[2px] max-w-xs transition duration-300 ease-in-out
                         hover:scale-110 text-white bg-custom-green px-4 py-2 hover:text-black hover:bg-white hover:border-2 hover:border-black' onClick={handleRegistration}>Get started</button>
                        </div>
                    </div>

                    <div className='w-screen mt-[-40px]'>
                        <div className='w-[600px] h-[600px] rounded-full overflow-hidden'>
                            <img src={HeroSectionFarm} alt='farm' className='w-full h-full object-cover'></img>
                        </div>
                    </div>

                </div>



                <div className='w-full-[50px] min-h-[100vh] flex flex-col justify-center items-center gap-[5px] px-[56px]'>
                    <div className='mb-[-25px]'>
                        <h1 className='text-custom-green text-[50px] font-bold'>About Us</h1>
                    </div>

                    <div className='flex gap-[20px] justify-center items-center mt-[-50px]'>
                        <div>
                            <img src={Image_two} alt='woman smiling' className='w-[730px] h-[650px]'></img>
                        </div>

                        <div className='max-w-[650px] text-[20px]'>
                            <p className='pl-[40px]'>
                                Welcome to our farm investment platform, the easiest and fastest way to connect with the world of agriculture.
                                At Cultify, we are dedicated to simplifying the investment process, providing you with a seamless experience
                                that unlocks the lucrative opportunities found within the farming industry. Our user-friendly platform empowers
                                you to explore and invest in farms with ease, allowing you to participate in the growth of this vital sector
                                . Join us today and embark on a journey that combines simplicity, speed, and the promise of prosperous farm investments.
                            </p>
                        </div>

                    </div>
                </div>



                <div className='w-full-[50px] min-h-[100vh] flex flex-col gap-[20px] px-[56px] mt-[10px] bg-[#C1DDEB]/20'>
                    <div className='justify-center items-center pl-[30%]'>
                        <h1 className='text-custom-green text-[52px] font-bold'>Why Choose Cultify</h1>
                    </div>

                    <div className=''>
                        <div className='flex gap-[40px] justify-center'>
                            <div className='bg-white w-[350px] h-[240px] border rounded-lg flex flex-col justify-center items-center'>
                                <img src={Simplicity} alt='simplicity' className='ml-4 mt-4'></img>
                                <p className='font-bold text-xl ml-4 mt-4 text-center'>SIMPLICITY</p>
                                <p className='text-[20px] text-center mt-3 px-3'>Easily explore our intuitive platform and tools for a stress-free farm investment journey.</p>
                            </div>
                            <div className='bg-white w-[350px] h-[240px] border rounded-lg flex flex-col justify-center items-center'>
                                <img src={Speed} alt='speed' className='ml-4 mt-4'></img>
                                <p className='font-bold text-xl ml-4 mt-4 text-center'>SPEED</p>
                                <p className='text-[20px] text-center mt-3 px-3'>Explore and select promising farm projects quickly with our streamlined investment process.</p>
                            </div>
                            <div className='bg-white w-[350px] h-[240px] border rounded-lg flex flex-col justify-center items-center'>
                                <img src={Transparency} alt='transparecy' className='ml-4 mt-4'></img>
                                <p className='font-bold text-xl ml-4 mt-4 text-center'>TRANSPARENCY</p>
                                <p className='text-[20px] text-center mt-3 px-3'> Access detailed farm profiles, projected returns, and associated risks to make informed decisions</p>
                            </div>
                        </div>


                        <div className='flex gap-[20px] justify-center items-center'>
                            <div className='bg-white mt-10 w-[350px] h-[240px] border rounded-lg flex flex-col justify-center items-center'>
                                <img src={Diversity} alt='diversity' className='ml-4 mt-4' ></img>
                                <p className='font-bold text-xl ml-4 mt-4 text-center'>DIVERSITY</p>
                                <p className='text-[20px] text-center mt-3 px-3 '>Access diverse farms across regions and crops for investment opportunities. </p>
                            </div>
                            <div className='bg-white  mt-10 w-[350px] h-[240px] border rounded-lg flex flex-col justify-center items-center'>
                                <img src={Support} alt='support' className='ml-4 mt-4'></img>
                                <p className='font-bold text-xl ml-4 mt-4 text-center'>SUPPORT</p>
                                <p className='text-[20px] text-center mt-3 px-3'>Rely on our dedicated team for prompt and reliable investment assistance.</p>
                            </div>
                        </div>
                    </div>
                </div>




                <div className='w-full-[50px] min-h-[100vh] flex flex-col justify-center items-center gap-[5px] px-[56px]'>
                    <div className='text-custom-green text-[52px] font-bold'>
                        <h1>How it works</h1>
                    </div>


                    <div className='flex mt-[30px]'>
                        <div>
                            <img src={Farmers} alt='farmers' className='w-[760px] h-[550px]'></img>
                        </div>


                        <div className='text-[20px] bg-[#C1DDEB]/10 border rounded-lg'>
                            <p className='pl-[30px] mt-[7%]'>
                                <div className='mb-[5%]'>
                                    <span className='font-bold'>Explore: </span> Discover diverse farm investment opportunities.<br />
                                </div>
                                <div className='mb-[5%]'>
                                    <span className='font-bold'>Research: </span>Access detailed information about farms, returns, and risks.<br />
                                </div>
                                <div className='mb-[5%]'>
                                    <span className='font-bold'>Invest:</span> Choose your desired farm and invest securely.<br />
                                </div>
                                <div className='mb-[5%]'>
                                    <span className='font-bold'>Track:</span> Monitor your investments and farm progress.<br />
                                </div>
                                <div className='mb-[5%]'>
                                    <span className='font-bold'>Manage:</span> Easily manage your profile and make adjustments.<br />
                                </div>
                                Join us today and experience the seamless process of investing in farms.<br />
                            </p>
                        </div>
                    </div>

                    <div className='ml-[55%] mt-[-4%] mb-3'>
                        <button className='rounded-lg border-solid border-[2px] max-w-xs transition duration-300 ease-in-out
                         hover:scale-110 text-white bg-custom-green px-4 py-2 hover:text-black hover:bg-white hover:border-2 hover:border-black' onClick={handleRegistration}>Get started</button>
                    </div>
                </div>

                <div className=' '>
                    <div className='bg-[#C1DDEB]/10 mt-[5%] px-[56px] border-custom-green border-2 mb-[15px]'>
                        <div className='text-[20px]'>
                            <p className='font-bold mb-5'>Cultify</p>
                        </div>

                        <div className='flex'>
                            <div>
                                <p>
                                    Need help or have a question? Contact our friendly <br />
                                    team.We're here to assist you with any inquiries or <br />
                                    support you may need. Reach out to us today!
                                </p>
                            </div>
                            <div className='ml-[60%]'>
                                <p>Contact us</p>
                                <p>GrowWithCultify@gmail.com</p>
                            </div>
                            <div className='ml-[60%]'>
                                <p>Contact us</p>
                                <p>GrowWithCultify@gmail.com</p>
                                <p>090123456789</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection



