#!/bin/bash

find -name "*.gz" -type f -delete

for file in $(find $PWD -type f -name "*.html" -o -name "*.css" -o -name "*.js");
do
    gzip -9 -c $file > $file.gz

    # if a gziped file size is greater or equal to an origin
    if [ $( wc -c $file.gz | cut -d' ' -f1) -ge $( wc -c $file | cut -d' ' -f1) ]; then
        rm $file.gz
    fi
done
