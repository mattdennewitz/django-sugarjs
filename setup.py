import os
from setuptools import setup, find_packages


def gen_package_data():
    for dirname, _, files in list(os.walk('django_sugarjs/static/django_sugarjs')):
        for fn in files:
            yield os.path.join(dirname[7:], fn)

package_data = list(gen_package_data())

setup(
    name='django_sugarjs',
    author='Pitchfork',
    author_email='dev@pitchfork.com',
    version='0.0.1',
    packages=find_packages(),
    package_data={'django_sugarjs': package_data},
    install_requires=['django >= 1.4'],
    zip_safe=False
)
