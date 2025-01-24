import about_fondo from '@/assets/imgs/fondo/about.jpg'
import equipos from '@/assets/imgs/personajes/equipos.png'
import CardCreator from '@/components/card/CardCreator'
import logo from '@/assets/imgs/logos/logomandar.png'
import deathlex from '@/assets/imgs/logos/deathlex.png'
import Footer from '@/components/ui/Footer'
import reviews from '@/assets/data/reviews.json'
import CardReview from '@/components/card/CardReview'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import avatar from '@/assets/imgs/personajes/equipos.png'

function AboutPage() {
  return (
    <main className='bg-violetPrimary' >

      <section className='relative h-[40vh] sm:h-[50vh] md:h-[70vh] overflow-hidden flex items-center justify-center' >
        <h3 className='text-white text-3xl md:text-6xl z-10 font-semibold' >
          SOBRE NOSOTROS
        </h3>
        <img
          src={about_fondo}
          alt="about_fondo"
          className='w-full absolute top-0 left-0 h-full z-0 object-cover'
        />
      </section>

      <section className='p-5 md:p-20' >
        <div className='flex flex-col-reverse md:flex-row gap-5 md:gap-20 items-center mx-auto justify-center' >
          <div className='flex-shrink-0 w-60 h-60 lg:w-[500px] lg:h-[500px]' >
            <img src={equipos} alt="about" className='rounded-full h-full w-full' />
          </div>
          <div className='md:max-w-2xl' >
            <h4 className='text-2xl pb-3' >SOBRE DIME LEGENDS</h4>
            <h3 className='text-4xl uppercase leading-[48px] font-semibold pb-5' >
              Dime Legends es una plataforma de torneos de videojuegos en línea
            </h3>
            <p className='text-xl leading-5 text-white/60 pb-5' >
              En Dime Legends, nuestra misión es proporcionar una plataforma accesible y emocionante para la organización y participación en torneos de videojuegos. Creemos en el poder de los videojuegos para unir a las personas y crear comunidades vibrantes y apasionadas. Nuestra plataforma está diseñada para ser intuitiva y fácil de usar, permitiendo a los jugadores de todos los niveles de habilidad crear y unirse a torneos con facilidad.
            </p>
            <p className='text-xl leading-5 text-white/60 pb-5' >
              Únete a nosotros en Dime Legends y sé parte de una comunidad que celebra la pasión por los videojuegos y la competencia justa. ¡Esperamos verte en nuestros próximos torneos!
            </p>
          </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 container pt-5' >
          <article>
            <h3 className='text-white text-4xl font-semibold text-center' >100</h3>
            <p className='text-white/70 text-center text-lg' >PARTICIPANTES</p>
          </article>
          <article>
            <h3 className='text-white text-4xl font-semibold text-center' >15+</h3>
            <p className='text-white/70 text-center text-lg' >ESPORTS</p>
          </article>
          <article>
            <h3 className='text-white text-4xl font-semibold text-center' >1500</h3>
            <p className='text-white/70 text-center text-lg' >INTEGRANTES</p>
          </article>
          <article>
            <h3 className='text-white text-4xl font-semibold text-center' >15+</h3>
            <p className='text-white/70 text-center text-lg' >CREADORES</p>
          </article>
        </div>
      </section>

      <section className='section_funtiona py-10 container' >
        {/* <div className='fondo-gradient max-w-5xl mx-auto rounded-3xl p-5' >
          <h3 className='text-3xl text-center font-semibold pb-5' >
            NUESTROS CREADORES
          </h3>
          <div>
            <div>
              <img src="" alt="" />
              <h4>Nombre</h4>
              <p>Descripción</p>
            </div>
            <div>
              <img src="" alt="" />
              <h4>Nombre</h4>
              <p>Descripción</p>
            </div>
            <div>
              <img src="" alt="" />
              <h4>Nombre</h4>
              <p>Descripción</p>
            </div>
          </div>
        </div> */}

        <div>
          <h3 className='text-4xl text-center font-semibold pb-10' >
            NUESTROS CREDORES
          </h3>
          <div className='grid grid-cols-[repeat(auto-fit,_minmax(150px,1fr))] 
          gap-10 md:gap-16 mx-auto max-w-3xl' >
            <CardCreator
              image={logo}
              name='Dime Legends'
              description='Creador de Dime Legends y apasionado por los videojuegos.'
            />
            <CardCreator
              image={deathlex}
              name='Deathlex'
              description='Creador de Dime Legends y apasionado por los videojuegos.'
            />
            <CardCreator
              image={logo}
              name='Nombre'
              description='Creador de Dime Legends y apasionado por los videojuegos.'
            />
            <CardCreator
              image={logo}
              name='Nombre'
              description='Creador de Dime Legends y apasionado por los videojuegos.'
            />
            <CardCreator
              image={logo}
              name='Nombre'
              description='Creador de Dime Legends y apasionado por los videojuegos.'
            />
            <CardCreator
              image={logo}
              name='Nombre'
              description='Creador de Dime Legends y apasionado por los videojuegos.'
            />
          </div>
        </div>

      </section>

      <section className='bg-[#18082E]' >
        <div className='container py-10' >
          <h3 className='text-4xl text-center font-semibold pb-10' >
            TESTIMONIOS
          </h3>

          <div className='px-8' >
            <Carousel>
              <CarouselContent>
                {
                  reviews.map((review, index) => (
                    <CarouselItem key={index} className='sm:basis-1/2' >
                      <CardReview
                        image={avatar}
                        comment={review.comment}
                        name={review.name}
                        punctuation={review.punctuation}
                      />
                    </CarouselItem>
                  ))
                }
              </CarouselContent>
              <CarouselPrevious className='bg-transparent' />
              <CarouselNext className='bg-transparent' />
            </Carousel>
          </div>

        </div>
      </section>

      <Footer />

    </main>
  )
}

export default AboutPage