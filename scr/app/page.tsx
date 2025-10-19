import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { quickStats, services, articles } from '@/lib/placeholder-data';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

async function getPosts() {
  // Fallback to static data if fetching fails
  return articles;
}

export default async function DashboardPage() {
  const allPosts = await getPosts();
  const featuredPosts = allPosts.slice(0, 4);
  const latestPosts = allPosts.slice(0, 3);

  const updatedQuickStats = [...quickStats];
  const layananAktifStat = updatedQuickStats.find(stat => stat.title === 'Layanan Aktif');
  if (layananAktifStat) {
    layananAktifStat.value = services.length.toString();
  }


  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Solusi Terpadu Administrasi Konstruksi Anda
        </h1>
        <p className="text-lg text-muted-foreground">
          Akses cepat ke dokumen, layanan, dan wawasan industri untuk
          memperlancar proyek Anda.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {updatedQuickStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Layanan Utama Kami
          </h2>
          <p className="text-muted-foreground">
            Biarkan kami membantu Anda dengan kebutuhan administrasi proyek.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
              <CardContent>
                <Button variant="outline" asChild>
                  <Link href="/services">
                    Pelajari Lebih Lanjut{' '}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {featuredPosts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Berita & Update Terbaru dari Blog
              </h2>
              <p className="text-muted-foreground">
                Wawasan terbaru dari dunia konstruksi.
              </p>
            </div>
             <Button variant="outline" asChild>
                <Link href="/blog">
                  Lihat Semua Postingan <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {featuredPosts.map((post) => (
                   <Card key={post.id} className="flex flex-col overflow-hidden">
                      <div className="relative h-40 w-full">
                          <Image
                          src={`https://picsum.photos/seed/${post.image}/600/400`}
                          alt={post.title}
                          fill
                          className="object-cover"
                          />
                      </div>
                      <CardHeader>
                          <div className="flex items-start justify-between text-sm text-muted-foreground">
                              <Badge variant="outline">{post.category}</Badge>
                              <span>{format(parseISO(post.date), 'd MMMM yyyy', { locale: id })}</span>
                          </div>
                          <CardTitle className="pt-2 text-base leading-snug">
                             <Link href={`/blog/${post.id}`} className="hover:underline">
                              {post.title}
                             </Link>
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p 
                          className="line-clamp-2 text-sm text-muted-foreground"
                        >
                          {post.excerpt}
                        </p>
                      </CardContent>
                      <CardFooter>
                      <Button
                          variant="ghost"
                          className="h-auto p-0 text-primary hover:text-primary"
                          asChild
                      >
                          <Link href={`/blog/${post.id}`}>
                          Baca selengkapnya{' '}
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                          </Link>
                      </Button>
                      </CardFooter>
                  </Card>
                ))}
          </div>
        </div>
      )}
    </div>
  );
}